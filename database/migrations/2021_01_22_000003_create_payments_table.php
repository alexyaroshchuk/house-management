<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date');
            $table->string('recommend_payment')->nullable();
            $table->string('fact_payment')->nullable();
            $table->string('source')->nullable();
            $table->unsignedInteger('apartment_id')->nullable();
            $table->string('currency')->nullable();
            $table->string('fact_payment_in_hrn')->nullable();
            $table->timestamps();

            $table->foreign('apartment_id')->references('id')->on('apartments');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
