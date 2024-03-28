import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {

    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Comment from "../Pages/Comment";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddReview from "./AddReview";


const ShowReview = () => {

    const { gid } = useParams()
    console.log(gid);

    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [game, setGame] = useState(null);
    const uid = sessionStorage.getItem("uid");


    const LikeStatus = () => {
        axios
            .get("http://localhost:5000/GameLikeStatus/" + uid + "/" + gid + "/")
            .then((res) => {
                if (res.data) {
                    setLiked(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const countData = () => {
        axios.get("http://localhost:5000/GameLikeCount/" + gid).then((res) => {
            setLikes(res.data.likeCount);
        });

        axios.get("http://localhost:5000/commentcount/" + gid).then((res) => {
            setComments(res.data.commentCount);
        });
    };

    const handleLike = () => {
        const datas = {
            gameId: gid,
            userId: uid,
        };
        axios.post("http://localhost:5000/GameLike", datas).then((res) => {
            console.log(res.data);
            setLiked(true);
            countData();
        });
    };

    const handleDislike = (id) => {
        axios
            .delete("http://localhost:5000/GameLike/" + uid + "/" + gid)
            .then((res) => {
                console.log(res.data);
                setLiked(false);
                countData();
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const fetchGame = () => {
        axios.get("http://localhost:5000/UploadGameById/" + gid).then((res) => {
            setGame(res.data.uploadGame);
        });
    }



    useEffect(() => {
        LikeStatus();
        countData();
        fetchGame()
    }, []);

    return (
        <>{
            game &&

            (<Card sx={{ margin: 5,p:3 }}>

                <CardMedia image={game.uploadfile} sx={{height:400,border:1,objectFit:'cover'}} />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <b style={{ color: "black" }}> {game.name} </b>{" "}
                        {game.desc}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="add to favorites"
                        onClick={() => {
                            liked ? handleDislike() : handleLike();
                        }}
                    >
                        {liked ? <FavoriteOutlinedIcon color="error" /> : <FavoriteBorder />}
                        {likes > 0 ? (
                            <span style={{ fontSize: "15px", paddingLeft: "5px" }}>
                                {likes}
                            </span>
                        ) : null}
                        {/* <Favorite /> */}
                    </IconButton>
                    <CommentIcon />
                    {comments > 0 ? (
                        <span style={{ fontSize: "15px", paddingLeft: "5px" }}>
                            {comments}
                        </span>
                    ) : null}
                   
                </CardActions>
                <AddReview gid={gid} countData={countData} />
            </Card>)
        }
        </>
    );
};

export default ShowReview;
