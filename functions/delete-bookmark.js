const sendQuery = require('./utils/send-query');

const DELETE_BOOKMARK = `
    mutation($id: ID!) {
        deleteBookmark(id: $id) {
            _id
        }
    }
`;

exports.handler = async event => {
    const { id } = JSON.parse(event.body);
    const { data, errors } = await sendQuery(DELETE_BOOKMARK, { id });

    if (errors) {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ deleteBookmark: data.deleteBookmark })
    }
}