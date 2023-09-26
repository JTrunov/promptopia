import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// read the prompt
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Post not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch a post", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found!", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update a post", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Post deleted successfully!", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete a post", { status: 500 });
  }
};
