import React from "react";

type Post = {
  prompt: string;
  tag: string;
};

type Props = {
  type: string;
  post: Post;
  setPost: any;
  submitting: boolean;
  handleSubmit: any;
};

const Form = ({ type, post, setPost, submitting, handleSubmit }: Props) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>
      <form className="mt-10 gap-7 w-full max-w-2x1 flex flex-col glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Enter your prompt"
            required
            className="form_textarea"
          />
        </label>
      </form>
    </section>
  );
};

export default Form;
