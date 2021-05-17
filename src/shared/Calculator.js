class Calculator {
  constructor(currencies) {
    this.currencies = currencies;
  }

  findCurrenciesAvailable(currencies) {
    return currencies.map((currency) => currency.name);
  }

  findPriceByName(name, currencies) {
    try {
      const [currency] = currencies.filter((currency) => {
        return currency.name === name;
      });

      return parseFloat(currency.price);
    } catch (err) {
      console.log(
        `Currency "${name}" not found 👻, check the data and try again.`
      );
    }
  }

  findCodeByName(name, currencies) {
    try {
      const [currency] = currencies.filter((currency) => {

        return currency.name === name;
      });

      return currency.code;
    } catch (err) {
      console.log(`Code "${name}" not found 👻, check the data and try again.`);
    }
  }

  convertValues(quantity, source, target) {
    try {
      const sourcePrice = this.findPriceByName(source, this.currencies);
      const targetPrice = this.findPriceByName(target, this.currencies);
      const code = this.findCodeByName(target, this.currencies);

      const result = (sourcePrice / targetPrice) * quantity;

      return result.toFixed(2);
    } catch (error) {
      console.log('Oh no 🙈, an error occurred, check the data and try again');
    }
  }

  async calculate() {
    const { quantity, source, target } = await this.getValuesFromCLI();
    const result = this.convertValues(quantity, source, target);
    console.log(result);
  }

  async getValuesFromCLI() {
    try {
      for (let i = 0; i <= 1; i++) {
        questions[i].choices = this.currencies;
      }
      
      let { source, target, quantity } = await prompt(questions);

      return { source, target, quantity };
    } catch (err) {
      console.log(`🙄 Ops, it shouldn't happen.`);
    }
  }

  addRate(value, rate) {
    const exchangeRate = value * (rate / 100);

    return value + exchangeRate;
  }
}

module.exports = Calculator;
