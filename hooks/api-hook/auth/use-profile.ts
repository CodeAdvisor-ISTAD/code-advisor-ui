
export async function fetchUserProfile() {
        const response = await fetch("/identity/api/v1/auth/me");
        const data = await response.json();

        if(response.ok){
            return data;
        }else{
            throw data; 
        }
}

