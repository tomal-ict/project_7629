@extends('layouts.admin')
@section('title', 'New Team Member')
@section('content')
@include('admin.team-members._form', ['item' => null])
@endsection