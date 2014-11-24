<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function() {
	return View::make('index');
});
Route::get('/modals/password', function() {
	return View::make('modals.password');
});
// =============================================
// API ROUTES ==================================
// =============================================
Route::group(array('prefix' => 'api'), function() {
	Route::resource('passwords', 'PasswordsController');
});

// =============================================
// CATCH ALL ROUTE =============================
// =============================================
// all routes that are not home or api will be redirected to the frontend
// this allows angular to route them
App::missing(function($exception)
{
	return View::make('index');
});
