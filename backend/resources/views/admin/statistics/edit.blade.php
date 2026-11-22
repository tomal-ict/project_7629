@extends('layouts.admin')
@section('title', 'Edit Statistic')
@section('content')
@include('admin.statistics._form', ['item' => $item])
@endsection