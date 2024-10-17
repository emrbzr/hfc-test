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

app.use(express.json()); // Add this line to parse JSON request bodies

// Get users route
app.get("/users", async (req: Request, res) => {
  const users = await User.findAll();
  res.json(users);
});

// View content for user
app.get(
  "/content/:userId",
  async (
    req: Request<{
      userId: number;
    }>,
    res: Response
  ) => {
    const userId = req?.params?.userId;

    try {
      const userContent = await Content.findAll({
        where: { userId: userId }
      });

      res.json(userContent);
    } catch (error) {
      console.error('Error fetching user content:', error);
      res.status(500).json({ error });
    }
  }
);

// Update content status
// If the status is not valid, return 400 status code
// If the content does not exist, return 404 status code
// If the content is already approved, you can't change the status, return 400 status code
app.patch("/content/:contentId/status", async (req: Request, res: Response) => {
  const contentId = parseInt(req?.params?.contentId);
  const { status } = req?.body;

  if (!Object.values(ContentStatus).includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const content = await Content.findByPk(contentId);

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
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

// NOTE: Above it mentions search should also look for content title but in the PDF requirements it is saying search is only for user title and user tags so I went with the requirements. 
// However I am sharing a version with content title search below as well, it would look like that.
  /*
  await User.findAll({
  include: [{
    model: Content,
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { '$user.name$': { [Op.like]: `%${query}%` } },
        { '$user.tags$': { [Op.like]: `%${query}%` } },
      ]
    },
  }],
  */
app.get("/search", async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: "Invalid search query" });
  }

  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { tags: { [Op.like]: `%${query}%` } },
        ]
      },
      attributes: ['id', 'name', 'tags']
    });

    res.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
