module.exports = async function (id) {
    let lista = localStorage.getItem('listaPai')
    if (lista !== null) {
        try {
            lista = lista.split(',')
            if (lista.indexOf(id) < 0) {
                localStorage.setItem(`listaPai`, localStorage.getItem('listaPai') + id + ',')
            } else {
                const listaAtualizada = lista.slice(0, lista.indexOf(id)).concat(lista.slice(lista.indexOf(id) + 1, lista.length))
                localStorage.setItem(`listaPai`, listaAtualizada)
            }
        } catch (error) {

        }
    } else {
        localStorage.setItem(`listaPai`, id + ',')
    }
}