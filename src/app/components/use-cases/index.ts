import createPost from "./post";
import { logger } from "../../libs/logger";

const post = ({params}) => createPost({logger}).post({params}); 

export {post}