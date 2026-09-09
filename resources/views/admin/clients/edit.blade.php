@extends('layouts.admin')
@section('title', 'Edit Client')
@section('content')
@include('admin.clients._form', ['item' => $item])
@endsection