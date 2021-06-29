const sendQuery = require('./utils/send-query');

const CREATE_BOOKMARK = `
    mutation($url: String!, $title: String!) {
        createBookmark(data: {url: $url, title: $title}) {
            _id
            url
            title
        }
    }
`

exports.handler = async event => {
    const { url, title } = JSON.parse(event.body);
    const { data, errors } = await sendQuery(CREATE_BOOKMARK, { url, title });

    if (errors) {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ newBookmark: data.createBookmark })
    }
}