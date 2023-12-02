async function getPokemon(url) {
    const response = await fetch(url)
    const data = await response.json()

    return {
        name: data.name,
        pokemonId: data.id,
        height: data.height,
        weight: data.weight,
        imageSrc: data.sprites.front_default
    }
}


async function main() {
    console.log('START')
    const start = performance.now()
    console.log(start)

    let baseUrl = 'https://pokeapi.co/api/v2/pokemon'
    let pokemonToSearch = true
    const pokemonPromises = []
    while (pokemonToSearch) {
        const response = await fetch(baseUrl)
        const data = await response.json()

        data.results.forEach(result => {
            pokemonPromises.push(getPokemon(result.url))
        })
        if (!data.next) {
            pokemonToSearch = false
        } else {
            baseUrl = data.next
        }
    }

    const data = await Promise.all(pokemonPromises)
    console.log(data)

    const end = performance.now()
    const timeToComplete = end - start
    console.log('complete', timeToComplete)
}

main()