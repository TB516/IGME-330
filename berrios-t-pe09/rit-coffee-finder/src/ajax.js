export const downloadFile = async (url, callback) => {
    const request = await fetch(url);
    
    if (!request.ok) {
        console.log("Error fetching data!");
    }

    const headers = request.headers;
    const json = await request.json();

    console.log(`headers = ${headers}`);
    console.log(`json = ${json}`);

    callback(json);
}