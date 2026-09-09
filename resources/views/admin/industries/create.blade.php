@extends('layouts.admin')
@section('title', 'New Industry')
@section('content')
@include('admin.industries._form', ['item' => null])
@endsection