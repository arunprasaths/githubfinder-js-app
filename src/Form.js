import axios from 'axios';

const API_URL = "https://api.github.com/users";

class Form{
    constructor(addCard, clearCards){

        this.addCard = addCard;
        this.clearCards = clearCards;

        this.API_URL = "";
        this.searchTerm = "";

        this.searchInput = document.querySelector('input[name="search"]');
        this.searchInput.addEventListener('keyup', () => this.handleKeyUp(event));

        this.submitButton = document.querySelector('button[type="submit"]');
        
        this.submitButton.disabled = !this.searchTerm;

        this.clearButton = document.querySelector('button[type="button"]');
        this.clearButton.addEventListener('click', () => this.clearCards());

        this.form = document.querySelector('form');
        this.form.addEventListener('submit', () => this.handleSubmit(event));
    }

    handleKeyUp(event){
        this.searchTerm = event.target.value.trim();
        this.API_URL = `${API_URL}/${this.searchTerm}`;
        //console.log(this.API_URL);

        this.submitButton.disabled = !this.searchTerm;
    }

    handleSubmit(event){
        event.preventDefault();
        axios.get(this.API_URL)
            .then(({data}) => this.addCard(data))
            .catch(err => this.formatError(err));

        this.form.reset();
    }

   

    formatError(err){
        console.log(err);
        const errorText = document.createElement('p');
        errorText.innerText = 'No user found';
        errorText.style.color = 'red';
        this.form.appendChild(errorText);

        setTimeout(() => this.form.removeChild(errorText),5000);
    }
}

export default Form;