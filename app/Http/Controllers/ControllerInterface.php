<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;

interface ControllerInterface
{
    public function index(Request $request);

    public function store(Request $request);

    public function create();

    public function edit($id);

    public function show($id, Request $request);

    public function update($id, Request $request);

    public function destroy($id);
}
