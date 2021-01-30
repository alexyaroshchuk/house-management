<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApartmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();
            $table->string('type'); //box, parking, apartment
            $table->string('number');
            $table->string('price')->nullable();
            $table->double('space')->nullable();
            $table->string('floor')->nullable();
            $table->string('status')->default('not_sold');

            $table->integer('first_payment')->default(0);
            $table->integer('count_payments')->nullable();
            $table->string('contract_number')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apartments');
    }
}
