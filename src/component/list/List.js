import React from 'react';
import handleResponse from '../../helper';
import {BasicURL} from '../../config';

class List extends React.Component{
    constructor(){
        super();
        this.state ={
            currencies: [],
            loading: false,
            text: 'initial',
            error : null,
            page: 1,
            totalPages: 0,
            color: null,
        }
        this.colorChange = this.colorChange.bind(this);
    }
    // define color blue for positive and red for negative
    colorChange(value){
        if(value<0){
            this.setState({color: 'red'})
        }else if(value>0){
            this.setState({color: 'blue'})
        }else return null
        return value
    }
    componentDidMount(){
        const {page} = this.state;
        this.setState({loading: true})
        const url = `${BasicURL}/cryptocurrencies?page=${page}&perPage=20`;
        // return(<div>from componentDidMount </div>)
        console.log("component did mount ")
        fetch(url)
        .then(handleResponse)
        .then(data => {
            console.log(data)
            this.setState({currencies: data.currencies, loading: false})
        })
        .catch(err => {
            console.log(err)
            this.setState({error: err.errorMessage, loading: false})
        });

    }
    componentWillMount(){
        // return(<div>from componentWillMount</div>)
        this.setState({text: 'later'})
        console.log('component will mount')
    }
    componentWillUnmount(){
        console.log('component will unmount')
    }
    render(){
        // this.setState({loading: true})
        console.log('main render', this.state.text)
        const {loading, currencies, error, color} = this.state;
        if(error){
            return <div>something went wrong.</div>
        }
        else 
        return(
            <div>
                <table>
                    <thead>
                        <th>rank</th>
                        <th>Cryptocurrency</th>
                        <th>price </th>
                        <th>market cap</th>
                        <th>24H change</th>
                    </thead>
                    <tbody>
                        {loading ? "loading....":currencies.map(currency =>{
                        // this.colorChange(currency.percentChange24h)
                        return <tr>
                            <td>{currency.rank}</td>
                            <td>{currency.name}</td>
                            <td>{currency.price}</td>
                            <td>{currency.marketCap}</td>
                            {color === 'red' ?
                             <td style = {{color: 'red'}}>{currency.percentChange24h}</td>
                            :  <td style = {{color: 'green'}}>{currency.percentChange24h}</td>
                        }
                        </tr>})
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List;