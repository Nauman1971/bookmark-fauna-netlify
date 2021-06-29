const sendQuery = require("./utils/send-query");

const GET_ALL_BOOKMARKS = `
    {
        allBookmarks {
            data {
                _id
                url
                title
            }
        }
    }
`;

exports.handler = async () => {
    const { data, errors } = await sendQuery(GET_ALL_BOOKMARKS);

    if (errors) {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ bookmarks: data.allBookmarks })
    }
}