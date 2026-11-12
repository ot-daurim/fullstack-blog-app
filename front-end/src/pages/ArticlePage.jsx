import { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import axios from "axios";
import articles from "../article-content";
import CommentsList from "../CommentsList";
import AddCommentForm from "../AddCommentForm";

export default function ArticlePage() {

    const {name} = useParams();
    const {upvote: initialUpvotes, comments: initialComments } = useLoaderData();
    const [upvote, setUpvote] = useState(initialUpvotes);
    const [comments, setComments] = useState(initialComments);

    const article = articles.find((item) => item.name === name);
    
    async function onUpvoteClicked() {
        const response = await axios.post(`/api/articles/${name}/upvote`);
        const updatedArticleData = response.data;
        setUpvote(updatedArticleData.upvote);
    }

    async function onAddComment({ nameText, commentText }) {
        const response = await axios.post(`/api/articles/${name}/comments`, {
            postedBy: nameText,
            text: commentText
        });
        const updatedArticleData = response.data;
        setComments(updatedArticleData.comments);
    }

    return(
        <>
            <h1>{article.title}</h1>
            <button onClick={onUpvoteClicked}>Upvote</button>
            <p>This article has {upvote} upvotes!</p>
            {article.content.map(p => 
                <p key={p}>{p}</p>
            )}
            <AddCommentForm onAddComment={onAddComment} />
            <CommentsList comments={comments}/>
        </>
    );
}

export async function loader({params}) {
    const response = await axios.get(`/api/articles/${params.name}`);
    const { upvote, comments} = response.data;
    return { upvote, comments};
}