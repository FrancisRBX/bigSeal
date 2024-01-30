import { data } from '../commands/ping';
import { config } from '../config';


async function getCSRFToken() {
    try {
        const response = await fetch(
            "https://friends.roblox.com/v1/users/321/request-friendship",
            {
                method: "POST",
                headers: {
                    Cookie: `.ROBLOSECURITY=${config.RBLX_COOKIE}`,
                },
            }
        );

        if (response.status === 403) {
            return response.headers.get("x-csrf-token"); // get x-csrf-token from headers
        }
    } catch (e) {
        console.log('Failed to get x-csrf-token because: ', e);
    }
}

const csrfToken = getCSRFToken();
const headers = { Cookie: config.RBLX_COOKIE, };

export async function getPlaceAvailability(placeID: string) {

    if (!csrfToken) {
        throw new Error('Failed to get x-csrf-token');
    }

    try {
        const response = await fetch('https://games.roblox.com/v1/games/multiget-place-details?placeIds=' + placeID, {
            method: "GET",
            headers: {
                Cookie: `.ROBLOSECURITY=${config.RBLX_COOKIE}`,
                "Content-Type": "application/json",
                "x-csrf-token": `${csrfToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data[0].isPlayable;
    } catch (error) {
        console.error('Error: ', error);
    }

}

export async function getRobloxProfile(profileID: string) {
    try {
        const response = await fetch('https://users.roblox.com/v1/users/' + profileID, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: ', error);
    }

}

export async function getRobloxProfileHeadshot(profileID: string){
        try {
            const response = await fetch('https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=' + profileID + '&size=420x420&format=Png&isCircular=false', {
                method: "GET",
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.data[0].imageUrl;
        } catch (error) {
            console.error('Error: ', error);
        }
}

export async function getPWData(){
    try {
        const response = await fetch('https://apis.roblox.com/ordered-data-stores/v1/universes/2627033687/orderedDataStores/PAINWAY LORE LAGO/scopes/210276149/scope', {
            method: "GET",
            headers: {
                Cookie: `.ROBLOSECURITY=${config.RBLX_COOKIE}`,
                "Content-Type": "application/json",
                "x-csrf-token": `${csrfToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error: ', error);
    }
}