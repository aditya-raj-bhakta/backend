import { pool } from "../../config/db.config.js";

export default async function postController(req, res) {

    // Replace with authenticated user id later
    const currentUserId = req.user?.user_id || 1;

    const query = `
        SELECT
            P.POST_ID,
            P.TITLE,
            P.CONTENT,
            P.POST_TYPE,
            P.CREATED_AT,
            P.VIEWS,
            P.UPVOTES,
            P.DOWNVOTES,
            P.COMMENT_COUNT,
            U.USER_ID,
            U.USERNAME,
            U.PROFILE_PIC,
            U.VERIFIED,
            S.SUBREDDIT_ID,
            S.NAME AS SUBREDDIT_NAME,
            S.ICON AS SUBREDDIT_ICON,
            S.MEMBER_COUNT,
            M.URL AS URL,
            M.THUMBNAIL,
            M.MEDIA_TYPE,
            V.VOTE_TYPE AS USER_VOTE,
            CASE
                WHEN SM.USER_ID IS NOT NULL
                THEN TRUE
                ELSE FALSE
            END AS JOINED
            FROM POSTS P
            LEFT JOIN USERS U
            ON P.USER_ID = U.USER_ID
            LEFT JOIN SUBREDDITS S
            ON P.SUBREDDIT_ID = S.SUBREDDIT_ID
            LEFT JOIN MEDIA M
            ON P.POST_ID = M.POST_ID
            LEFT JOIN VOTES V
            ON V.POST_ID = P.POST_ID
            AND V.USER_ID = ?
            LEFT JOIN SUBREDDIT_MEMBERS SM
            ON SM.SUBREDDIT_ID = S.SUBREDDIT_ID
            AND SM.USER_ID = ?
            WHERE P.STATUS='active'
            ORDER BY P.POST_ID DESC
            LIMIT 20
            `;

    const results=await pool.execute(
        query,
        [currentUserId, currentUserId])
        const formatted = results[0].map((post) => {
            
            return{

                id: post.POST_ID,

                user: {
                    id: post.USER_ID,
                    username: post.USERNAME,
                    profilePic: post.PROFILE_PIC,
                    verified: Boolean(post.VERIFIED)
                },

                subreddit: {
                    id: post.SUBREDDIT_ID,
                    name: post.SUBREDDIT_NAME,
                    icon: post.SUBREDDIT_ICON,
                    members: post.MEMBER_COUNT,
                    joined: Boolean(post.JOINED)
                },

                content: {
                    title: post.TITLE,
                    description: post.CONTENT,
                    url: post.URL,
                    thumbnail: post.THUMBNAIL,
                    type: post.MEDIA_TYPE
                },

                reactions: {
                    votes: {
                        upvotes: post.UPVOTES || 0,
                        downvotes: post.DOWNVOTES || 0,
                        currentUserVote: post.USER_VOTE || null
                    },

                    comments: post.COMMENT_COUNT || 0,

                    share: 0
                },

                metadata: {
                    views: post.VIEWS || 0,
                    createdAt: post.CREATED_AT
                }

            };
        });

        return res.status(200).json({
                success: true,
                count: formatted.length,
                posts: formatted
            });

        }