@extends('layouts.admin')
@section('title', 'New Advantage')
@section('content')
@include('admin.advantages._form', ['item' => null])
@endsection