const sendQuery = require('./utils/send-query');

const UPDATE = `
    mutation($id: ID!, $url: String!, $title: String!) {
        updateBookmark(id: $id, data: {url: $url, title: $title}) {
            _id
            url
            title
        }
    }
`

exports.handler = async event => {
    const { id, url, title } = JSON.parse(event.body);
    const { data, errors } = await sendQuery(UPDATE,
        { id, url, title }
    );

    if (errors) {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ updateBookmark: data.updateBookmark })
    };
}