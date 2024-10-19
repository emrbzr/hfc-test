import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import Content from "./models/Content.model";
import User from "./models/User.model";
import express, { Request, Response } from "express";
import cors from "cors";
import { ContentStatus } from "./enums/ContentStatus.enum";

const app = express();
const PORT = 4000;

const sequelize = new Sequelize("HFC", "root", "HFC2023", {
  host: "35.239.125.245",
  dialect: "mysql",
});

sequelize.addModels([User, Content]);

// Create table if not exists
sequelize.sync();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json()); // Adding this line to parse JSON request bodies

// Get users route
app.get("/users", async (req: Request, res: Response<User[] | { error: string }>) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// View content for user
app.get(
  "/content/:userId",
  async (
    req: Request<{ userId: string }>,
    res: Response<Content[] | { error: string }>
  ) => {
    const userId = req?.params?.userId;

    try {
      const userContent = await Content.findAll({
        where: { userId: userId }
      });

      res.json(userContent);
    } catch (error) {
      console.error('Error fetching user content:', error);
      res.status(500).json({ error: "Internal server error while fetching user content" });
    }
  }
);

// Update content status
// If the status is not valid, return 400 status code
// If the content does not exist, return 404 status code
// If the content is already approved, you can't change the status, return 400 status code
app.patch("/content/:userId/:contentId/status", async (
  req: Request<{ userId: string, contentId: string }, any, { status: ContentStatus }>,
  res: Response<Content | { error: string }>
) => {
  const userId = parseInt(req.params.userId);
  const contentId = parseInt(req.params.contentId);
  const { status } = req.body;

  if (!Object.values(ContentStatus).includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const content = await Content.findOne({
      where: {
        id: contentId,
        userId: userId
      }
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found or does not belong to the user" });
    }

    if (content.status === ContentStatus.APPROVED) {
      return res.status(400).json({ error: "Cannot change status of approved content" });
    }

    content.status = status;
    await content.save();

    res.json(content);
  } catch (error) {
    console.error('Error updating content status:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search endpoint
// Search by user title, user tags and content title

// NOTE: Above it mentions search should also look for content title but in the PDF requirements it is saying search is only for user title and user tags, however I followed the above mentioned requirements.
// However, below I am sharing a version without content title search like the email PDF requirement.
  /*
  const users = await User.findAll({ //This is the version for only user title and user tags search
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { tags: { [Op.like]: `%${query}%` } },
        ]
      },
      attributes: ['id', 'name', 'tags']
    });
  */

app.get("/search", async (
  req: Request<{}, any, any, { query: string }>,
  res: Response<User[] | { error: string }>
) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Invalid/missing search query" });
  }

  try {
    const results = await User.findAll({
      include: [{
        model: Content,
        required: false, // This allows users to be returned even if they don't have matching content
        where: {
          title: { [Op.like]: `%${query}%` }
        },
      }],
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { tags: { [Op.like]: `%${query}%` } },
          { '$contents.title$': { [Op.like]: `%${query}%` } },
        ]
      },
      attributes: ['id', 'name', 'tags']
    });

    res.json(results);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: "Internal server error while searching users" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
