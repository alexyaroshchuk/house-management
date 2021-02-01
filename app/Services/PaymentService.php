<?php namespace App\Services;

use App\Models\Payment;
use App\Repositories\PaymentRepo;

class PaymentService extends BaseService
{
    protected string $repository = PaymentRepo::class;

    public function createOne(array $data)
    {
        $data['fact_payment_in_hrn'] = $this->getPaymentInHrn($data['fact_payment'], $data['currency'], $data['date']);

        return $this->repo->createOne($data);
    }

    public function updateOne(array $data, $id)
    {
        $data['fact_payment_in_hrn'] = $this->getPaymentInHrn($data['fact_payment'], $data['currency'], $data['date']);

        return $this->repo->updateOne($data, $id);
    }

    /**
     * @param string $factPayment
     * @param $currency
     * @param $date
     * @return string
     */
    public function getPaymentInHrn(string $factPayment, $currency, $date)
    {
        if ($currency != 'hrn') {
            $date = str_replace("-", "", $date);
            $url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=$currency&date=$date&json";
            $contents = json_decode(file_get_contents($url));

            return $factPayment * $contents[0]->rate;
        }

        return $factPayment * $currency;

    }
}
