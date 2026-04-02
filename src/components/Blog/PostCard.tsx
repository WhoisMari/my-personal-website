import { Link } from "react-router-dom";
import Moment from "moment";
import ReactMarkdown from "react-markdown";
import config from "../../config.json";
import "./PostCard.scss";

const serverBase = config.server_url.replace("/api", "");
function mediaUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path.split("?")[0];
  return `${serverBase}${path.split("?")[0]}`;
}

interface PostCardProps {
  slug: string;
  title: string;
  thumbnail: string;
  date: string;
  intro: string;
}

Moment.locale("en");

const PostCard = ({ slug, title, thumbnail, date, intro }: PostCardProps) => (
  <div className="post-card">
    <Link to={`/blog/${slug}/`}>
      <div className="post-card-inner">
        <div className="post-card-image">
          <img src={mediaUrl(thumbnail)} alt={title} />
        </div>
        <div className="post-card-text">
          <div className="post-card-title">{title}</div>
          <div className="post-card-date">{Moment(date).format("MMM D, Y")}</div>
          <div className="post-card-intro">
            <ReactMarkdown>{intro}</ReactMarkdown>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default PostCard;
