import './LoanCalculator.css';
import LoanJS from "loanjs";
import {useState} from "react";
// import { calculateNewValue } from '@testing-library/user-event/dist/utils';

export default function LoanCalculator() {
    const[values,setvalues]=useState({
        "loan-amount":1,
        "loan-term":2,
        "interest-rate":3
    });
    const[installments,setInstallments]=useState([]);

    const handleInputChange=(event: any)=>{
      const{name, value}=event.target;
      setvalues({
            ...values,
            [name]: value
      });
//  console.log(values);
     
    };

    const handleSubmit=(event:any)=>{
        event.preventDefault();
        calculate(values["loan-amount"],values["loan-term"],values["interest-rate"]);
        // calculate(10000,7,8);
    };
    const calculate=(amount:number, years: number, rate: number)=>{
        var loan = new LoanJS.Loan(amount,years*12,rate);
        setInstallments(loan.installments);
          console.log(installments);
        //   console.log(loan);
    }
    const amountFormat=(amount:number)=>
    new Intl.NumberFormat("en-IN",{
        style:"currency",
        currency:'INR',
        }).format(amount);
    

    
  return (
    <div className='loan-calculator-container'>
      <h1>Loan Calculator</h1>

      <form onSubmit={handleSubmit}>
        <div className='form-item'>
            <label htmlFor="loan-amount">Loan Amount</label>
            <div className="form-input">
                <input type="number" name='loan-amount' placeholder='0'
                value={values["loan-amount"]} onChange={handleInputChange}/>
            </div>
        </div>

        <div className='form-item'>
            <label htmlFor="interest-rate">Interest Rate</label>
            <div className="form-input">
                <input type="number" name='interest-rate' placeholder='0'
                value={values["interest-rate"]} onChange={handleInputChange}/>
            </div>
        </div>
        <div className='form-item'>
            <label htmlFor="loan-tenure">Loan Term(years)</label>
            <div className="form-input">
                <input type="number" name='loan-term' placeholder='0'
                value={values["loan-term"]} onChange={handleInputChange}/> 
            </div>
        </div>
        <div className="form-action">
            <input type="submit" value="Calculate" className='calculate-button' />
        </div>
      </form>
     {!!installments?.length && <table>
      
          <thead>
              <tr>
                  <th>Month</th>
                  <th>Payment Amount</th>
                  <th>Interest Paid</th>
                  <th>Principal Paid</th>
                  <th>Remain</th>
              </tr>
          </thead>
          <tbody>
              {installments.map((i:any, ind:number) =>(
                  <tr key={ind}>
                  <td>{ind+1}</td>
                  <td>{amountFormat(i.installment)}</td>
                  <td>{amountFormat(i.interest)}</td>
                  <td>{amountFormat(i.capital)}</td>
                  <td>{amountFormat(i.remain)}</td>
              </tr>
              ))}
              
          </tbody>
      </table>
     } 
    </div>
  )
}
