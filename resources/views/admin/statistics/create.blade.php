@extends('layouts.admin')
@section('title', 'New Statistic')
@section('content')
@include('admin.statistics._form', ['item' => null])
@endsection