@extends('layouts.admin')
@section('title', 'New Service')
@section('content')
@include('admin.services._form', ['item' => null])
@endsection