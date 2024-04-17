const fetchData = async (url : string) : Promise<unknown> => {
    const request : Response = await fetch(url);

    return request.json();
}

export {fetchData}