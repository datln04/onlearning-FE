import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PaypalV2ControllerApi } from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';

const paypalApi = new PaypalV2ControllerApi(ApiClientSingleton.getInstance());
function PayPalCapture() {
  const [search] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = search.get('token');
    const payerID = search.get('PayerID');
    paypalApi.getCaptureOrder(token, payerID, (err, res) => {
      if (!err) {
        navigate('/my-profile');
      }
    });
  }, []);
  return <></>;
}

export default PayPalCapture;
