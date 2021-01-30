<?php

namespace App\Providers;

use App\Models\Container;
use App\Models\Contract;
use App\Models\Expense;
use App\Models\Payment;
use App\Models\SellerContract;
use App\Models\Shipment;
use App\Observers\ContainerObserver;
use App\Observers\ContractObserver;
use App\Observers\ExpenseObserver;
use App\Observers\PaymentObserver;
use App\Observers\SellerContractObserver;
use App\Observers\ShipmentObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

    }
}
