<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', 'HomeController@index')->name('home');


Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');

Route::middleware('auth')->group(function () {
        Route::Resource('users', 'UserController');
        Route::Resource('comments', 'CommentController');
        Route::Resource('payments', 'PaymentController');

        Route::get('apartments/add-comment/{apartmentId}', 'ApartmentController@addCommentToApartment')->name('add-comment-to-apartment');
        Route::get('apartments/add-payment/{apartmentId}', 'ApartmentController@addPaymentToApartment')->name('add-payment-to-apartment');
        Route::Resource('apartments', 'ApartmentController');
        Route::Resource('spaces', 'SpaceController');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
