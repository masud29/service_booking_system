<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::where('status', true)->get();
        
        return response()->json([
            'services' => $services,
        ]);
    }

    public function store(ServiceRequest $request)
    {

        $service = Service::create($request->all());

        return response()->json([
            'message' => 'Service created successfully',
            'service' => $service,
        ], 201);
    }

    public function show(string $id)
    {
        $service = Service::findOrFail($id);
        
        return response()->json([
            'service' => $service,
        ]);
    }

    public function update(ServiceRequest $request, string $id)
    {

        $service = Service::findOrFail($id);
        $service->update($request->all());

        return response()->json([
            'message' => 'Service updated successfully',
            'service' => $service,
        ]);
    }

    public function destroy(string $id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json([
            'message' => 'Service deleted successfully',
        ]);
    }
}
