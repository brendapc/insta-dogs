import React from "react";
import { COMMENT_POST } from "../../Api";
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import useFetch from "../../Hooks/useFetch";

const PhotoCommentsForm = ({ id, setComments }) => {
  const { request } = useFetch();
  const [comment, setComment] = React.useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const {response, json} = await request(url, options);
    if(response.ok){
        setComment('')
        setComments((comments)=> [...comments, json])
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        name="comment"
        placeholder="Comente..."
        onChange={({ target }) => setComment(target.value)}
      />
      <button>
        <Enviar />
      </button>
    </form>
  );
};

export default PhotoCommentsForm;
