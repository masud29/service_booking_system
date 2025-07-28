<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Service;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function allBookings()
    {
        $bookings = Booking::with(['user', 'service'])->get();
        
        return response()->json([
            'bookings' => $bookings,
        ]);
    }

    public function allServices()
    {
        $services = Service::all();
        
        return response()->json([
            'services' => $services,
        ]);
    }
}
