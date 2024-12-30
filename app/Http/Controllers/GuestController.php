<?php

namespace App\Http\Controllers;

class GuestController extends Controller
{
    public function index()
    {
        return inertia('Welcome');
    }

    public function store()
    {
        return inertia('Login');
    }

    public function create()
    {
        return inertia('Register');
    }
}
