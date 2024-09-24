import './Account.css';

const Account = (props) => {
    return ( 
        <div className="user__account__container">
            <div className="account__container">
                <div className="account__header text-center">
                    <h1 style={{fontSize:'50px', color:'rgb(255, 0, 0, 0.5)', fontWeight:'bolder'}}>My account</h1>
                </div>
                <div className="account__page__detail">
                    {props.children}
                </div>
            </div>
        </div>
     );
}
 
export default Account;