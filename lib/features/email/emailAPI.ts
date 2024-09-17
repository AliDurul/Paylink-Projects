'use server'

const TENANT_ID = process.env.TENANT_ID


// let accessToken: any = null, expiresIn = 0, tokenExpiryTime: number = 0
let accessToken: string | null = null;
let tokenExpiryTime = 0;

const isTokenExpired = (): boolean => {
    return Date.now() >= tokenExpiryTime;
};

export const refreshAccessToken = async (): Promise<string | object> => {
    const bodyOptions = {
        client_id: process.env.CLIENT_ID || '',
        scope: 'https://graph.microsoft.com/.default',
        client_secret: process.env.CLIENT_SECRET || '',
        grant_type: 'client_credentials'
    }
    const url = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
    const urlEncodedData = new URLSearchParams(bodyOptions).toString();

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': "application/x-www-form-urlencoded" },
            cache: "no-cache",
            body: urlEncodedData,
        });

        const data = await response.json();
        if (response.ok) {
            accessToken = data.access_token;
            const expiresIn = data.expires_in || 3600;
            tokenExpiryTime = Date.now() + expiresIn * 1000
            console.log('yeni access token alindi');
            return data.access_token
        } else {
            throw new Error(data.error || "Something went wrong, Please try again!");
        }
    } catch (error: any) {
        return { error: error.message };
    }
};

const getAccessToken = async (): Promise<string | object> => {
    if (!accessToken || isTokenExpired()) {
        console.log('expired token');
        return await refreshAccessToken();
    }
    console.log('with same token');

    return accessToken;
};


export const getAllEmails = async () => {

    let accessToken = await getAccessToken();
    const url = `https://graph.microsoft.com/v1.0/users/${process.env.EMAIL_USER_ID}/messages`

    try {
        const response = await fetch(url, {
            headers: {
                'Prefer': "outlook.body-content-type=html",
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-cache",
        });

        const data = await response.json();

        if (response.ok) {
            return data.value;
        } else {
            throw new Error(data.error.message || "Something went wrong, Please try again!");
        }
    } catch (error: any) {
        return { error: error.message };
    }
}

export const updateIsReadEmail = async (emailId: string, isRead: boolean) => {
    console.log('update email fundtinon runs');
    let accessToken = await getAccessToken();
    const url = `https://graph.microsoft.com/v1.0/users/${process.env.EMAIL_USER_ID}/messages`
    try {
        const response = await fetch(`${url}/${emailId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "isRead": isRead }),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            return data.value;
        } else {
            throw new Error(data.error.message || "Something went wrong, Please try again!");
        }
    } catch (error: any) {
        return { error: error.message };
    }
}
