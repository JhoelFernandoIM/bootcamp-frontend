const API_URL = 'https://apibox.vercel.app/RGxQnAzzuo94pJR1ZhfIIXKkfwqt1nlf/api/students'


export const fetchStudents = async () => {
    const response = await fetch(API_URL)

    return  response.json()
}

export const createStudent = async (payload) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    const response = await fetch(API_URL, options)

    return await response.json()
}

export const removeStudent = async (id) => {
    const options = {
        method: 'DELETE'
    }

    const response = await fetch(`${API_URL}/${id}`, options)

    return await response.json()
}
