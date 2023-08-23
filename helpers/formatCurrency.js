exports.formmatCurrencyToVND = async (val) => {
    return await currency.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })

}