<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRequest;
use App\Models\Booking;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Auth::user()->bookings()->with('service')->get();
        
        return response()->json([
            'bookings' => $bookings,
        ]);
    }

    public function store(BookingRequest $request)
    {

        $service = Service::where('id', $request->service_id)
            ->where('status', true)
            ->firstOrFail();

        $booking = Booking::create([
            'user_id' => Auth::id(),
            'service_id' => $request->service_id,
            'booking_date' => $request->booking_date,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Booking created successfully',
            'booking' => $booking->load('service'),
        ], 201);
    }

    public function show(string $id)
    {
        $booking = Auth::user()->bookings()->with('service')->findOrFail($id);
        
        return response()->json([
            'booking' => $booking,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'booking_date' => 'sometimes|required|date|after:today',
            'status' => 'sometimes|required|in:pending,confirmed,cancelled,completed',
        ]);

        $booking = Auth::user()->bookings()->findOrFail($id);
        $booking->update($request->all());

        return response()->json([
            'message' => 'Booking updated successfully',
            'booking' => $booking->load('service'),
        ]);
    }

    public function destroy(string $id)
    {
        $booking = Auth::user()->bookings()->findOrFail($id);
        $booking->delete();

        return response()->json([
            'message' => 'Booking cancelled successfully',
        ]);
    }
}
