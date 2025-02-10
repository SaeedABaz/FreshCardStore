import succefullPay from '../../assets/succefullPay.jpg';

export default function AllOrders() {

    return (
    <div className="flex flex-col items-center justify-center">
      <img src={succefullPay} alt="" />
      <h2>Congratulations! Your product succefully completed</h2>
    </div>
  )
}
