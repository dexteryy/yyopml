<?xml version="1.0" encoding="UTF-8" ?>
<!--
	YyOPML: share your OPML with your friends on web browser
	Created by Dexter.Yy(http://www.limboy.com) on 2008-05-25.
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output encoding="UTF-8" method="html" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" />

<xsl:template match = "/opml" >
	
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title><xsl:value-of select="head/title" /></title>
	<link type="text/css" href="style/ui/yyopml_panel.css" rel="stylesheet" media="screen"/>
</head>
<body>
    <xsl:for-each select="head/*" >
    <h1 title="{name()}">
		<span><xsl:value-of select="." /></span>
		<div id="theme">
			<strong>Theme：</strong>
			<ul>
				<li><a href="#theme=google">Google-style</a></li>
				<li><a href="#theme=panel">OS-panel</a></li>
			</ul>
		</div>
	</h1>
    </xsl:for-each>

	

	<div id="allfeeds">
  	<xsl:apply-templates select="body"/>
	</div>
	
	<div id="foot">
		<p><a href="http://code.google.com/p/yyopml/" target="_blank">YyOPML</a>: The way to share your subscription feeds with your friends on the web.</p>
		<p>Created by Dexter.Yy | <a href="http://www.limboy.com" target="_blank">www.limboy.com</a></p>
	</div>
	
<script type="text/javascript" src="style/ui/yy_core.js"/>
<script type="text/javascript" src="style/ui/yyopml.js"/>
	
</body>
</html>

</xsl:template>

<xsl:template match = "outline" >

<div>
	<xsl:attribute name="class">
		<xsl:choose>
			<xsl:when test="parent::outline">feed</xsl:when>
			<xsl:otherwise>sort</xsl:otherwise>
		</xsl:choose>
	</xsl:attribute>
	
	<xsl:if test="not(parent::outline)">
		<h2><strong><xsl:value-of select = "@text" disable-output-escaping = "yes" /></strong></h2>
	</xsl:if>
	
	<div>
		<xsl:attribute name="class">
			<xsl:if test="not(parent::outline)">list</xsl:if>
		</xsl:attribute>
		
		
	<xsl:if test="parent::outline">
		<a class="feed_name" href="#">
			<xsl:attribute name="title"><xsl:value-of select = "@title" disable-output-escaping = "yes" /></xsl:attribute>
			<xsl:value-of select = "@title" disable-output-escaping = "yes" />
		</a>
		<ul class="feed_attr">
			<li>Title：<span><xsl:value-of select = "@text" disable-output-escaping = "yes" /></span></li>
			<li>URL：<a title="网址" target="_blank">
				<xsl:attribute name="href"><xsl:value-of select = "@htmlUrl" disable-output-escaping = "yes" /></xsl:attribute>
				<xsl:value-of select = "@htmlUrl" disable-output-escaping = "yes" />
			</a></li>
			<li>Feed：<a title="feed地址" target="_blank">
				<xsl:attribute name="href"><xsl:value-of select = "@xmlUrl" disable-output-escaping = "yes" /></xsl:attribute>
				<xsl:value-of select = "@xmlUrl" disable-output-escaping = "yes" />
			</a></li>
		</ul>
	</xsl:if>
	
	<xsl:apply-templates />
	</div>
</div>

</xsl:template>

</xsl:stylesheet>
