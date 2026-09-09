@extends('layouts.admin')
@section('title', 'Edit Setting')
@section('content')
@include('admin.settings._form', ['item' => $item])
@endsection