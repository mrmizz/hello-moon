export async function main(counter: number, total: any): Promise<any> {
    const response = await makeRequest(
        options(counter)
    )
    console.log(response);
    let data = response.data;
    if (data.length == 0) {
        return total
    } else {
        total = total.concat(data);
        console.log(total);
        counter += 1;
        console.log(counter);
        await main(
            counter, total
        )
    }
}

async function makeRequest(options: any): Promise<any> {
    return await fetch('https://rest-api.hellomoon.io/v0/nft/collection/mints', options)
        .then(response => response.json())
        .catch(err => console.error(err)) as any;
}

interface HelloMoonReposne {
    data: {
        nftMint: string
    },
    paginationToken: string
}

function options(page: number) {
    return {
        method: 'POST',
            headers: {
        accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer db98e2f3-6d3b-48a2-8cc6-7e6d20b1e684'
    },
        body: JSON.stringify(
            {
                helloMoonCollectionId: 'daf7d7d50c83bd9bbb615bfe9a2a81a4',
                page: page
            }
        )
    }
}
