package com.breville.aem.brands.core.pojo;

import java.util.List;

import com.breville.aem.brands.core.models.Tiles;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryRoundTiles {
	
	private String algoliaAttrMap;
	
	private String roundTilesCategory;
	
	private List<Tiles> tiles;

}
