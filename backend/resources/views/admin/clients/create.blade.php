@extends('layouts.admin')
@section('title', 'New Client')
@section('content')
@include('admin.clients._form', ['item' => null])
@endsection