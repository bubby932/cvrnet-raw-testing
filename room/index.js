const id = document.URL.split('#')[1];

window.fetch(`https://api.compensationvr.tk/api/rooms/room/${id}/info`).then((response) => {
    const name_attr = document.getElementById('name-attr');
    const desc_attr = document.getElementById('desc-attr');
    const tags_attr = document.getElementById('tags-attr');

    if(response.status != 200) {
        name_attr.innerText = "Failed to load room.";
        desc_attr.innerText = "Failed to load room.";
        tags_attr.innerText = "";

        response.text().then((value) => {
            alert(`Failed to load room.\nStatus Code: ${response.status}\nResponse Content:\n${value}`);
        });
        return;
    }
    response.json().then((data) => {
        document.title = `Low Quality CVRNet - ${data.name}`;

        name_attr.innerText = `UsernameLoading/${data.name}`;
        desc_attr.innerText = data.description;
        tags_attr.innerText = data.tags.join(', ');

        window.fetch(`https://api.compensationvr.tk/api/accounts/${data.creator_id}/public`).then((response) => {
            if(response.status != 200) {
                name_attr.innerText = "Failed to load room.";
                desc_attr.innerText = "Failed to load room.";
                tags_attr.innerText = "";
        
                response.text().then((value) => {
                    alert(`Failed to load room.\nStatus Code: ${response.status}\nResponse Content:\n${value}`);
                });
                return;
            }

            response.json().then((player_data) => {
                name_attr.innerText = `${player_data.username}/${data.name}`;
            });
        });
    });
});